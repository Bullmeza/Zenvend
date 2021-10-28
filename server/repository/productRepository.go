package repository

import (
	"context"
	"errors"
	"log"
	"time"

	"zenvend/graph/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type ProductRepository interface {
	CreateProduct(*model.ProductInput) (*model.Product, error)
	SearchProductById(*model.ID) (*model.Product, error)
	SearchProductByLocation(*model.LocationSearch) ([]*model.Product, error)
}

func NewProductRepository(dbClient *mongo.Client) ProductRepository {
	productDB := dbClient.Database(DATABASE).Collection("products")
	var expTime int32 = 86400 * 7
	models := []mongo.IndexModel{
		{
			Keys:    bson.M{"createdat": 1},
			Options: options.Index().SetExpireAfterSeconds(expTime),
		},
		{
			Keys: bson.M{"location": "2dsphere"},
		},
	}
	_, err := productDB.Indexes().CreateMany(context.TODO(), models)
	if err != nil {
		log.Print(err)
	}
	return &collection{
		productDB,
	}
}

func (db collection) CreateProduct(input *model.ProductInput) (*model.Product, error) {
	product := &model.Product{
		Name: input.Name,
		Price: &model.Money{
			Currency: input.Price.Currency,
			Value:    input.Price.Value,
		},
		Description: input.Description,
		Image:       input.Image,
		Author:      input.Author,
		StoreName:   input.StoreName,
		Location: &model.Location{
			Type:        "Point",
			Coordinates: input.Location.Coordinates,
		},
		CreatedAt: time.Now(),
	}

	result, err := db.InsertOne(context.TODO(), product)
	if err != nil {
		return nil, err
	}
	productId := parseObjectId(result.InsertedID)
	product.ID = &productId

	return product, nil
}
func (db collection) SearchProductById(input *model.ID) (*model.Product, error) {
	parsedId, _ := primitive.ObjectIDFromHex(input.ID)
	searchParam := &bson.M{"_id": parsedId}
	result, err := db.SearchProducts(searchParam)
	if err != nil || len(result) == 0 {
		return nil, errors.New("product not found")
	}
	return result[0], nil
}

func (db collection) SearchProductByLocation(input *model.LocationSearch) ([]*model.Product, error) {
	searchParam := &bson.M{"location": bson.M{
		"$nearSphere": bson.M{
			"$geometry": bson.M{
				"type":        "Point",
				"coordinates": input.Coordinates,
			},
			"$maxDistance": input.Radius,
		},
	}}
	result, err := db.SearchProducts(searchParam)
	return result, err
}

func (db collection) SearchProducts(searchParam *bson.M) ([]*model.Product, error) {
	cursor, err := db.Find(context.TODO(), searchParam)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())
	var result []*model.Product
	for cursor.Next(context.TODO()) {
		var v *model.Product
		err = cursor.Decode(&v)
		result = append(result, v)
	}
	return result, err
}

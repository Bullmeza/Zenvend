package repository

import (
	"context"
	"errors"

	"zenvend/graph/model"

	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type UserRepository interface {
	CreateUser(user *model.UserInput) (*model.User, error)
	GetUser(input *model.UserInput) (*model.User, error)
	GetUserBySessionID(input *model.SessionID) (*model.User, error)
	GetUserByID(input *model.ID) (*model.User, error)
}

func NewUserRepository(dbClient *mongo.Client) UserRepository {
	userDB := dbClient.Database(DATABASE).Collection("users")
	models := []mongo.IndexModel{
		{
			Keys:    bson.M{"email": 1},
			Options: options.Index().SetUnique(true),
		},
	}
	userDB.Indexes().CreateMany(context.TODO(), models)
	return &collection{
		userDB,
	}
}

func (db collection) CreateUser(input *model.UserInput) (*model.User, error) {
	userUuid := uuid.New().String()
	user := &model.User{
		Email:     input.Email,
		Password:  &input.Password,
		Sessionid: &userUuid,
		Points:    0,
	}

	result, err := db.InsertOne(context.TODO(), user)
	if mongo.IsDuplicateKeyError(err) {
		return nil, errors.New("duplicate email")
	}
	userId := parseObjectId(result.InsertedID)
	user.ID = &userId
	user.Password = nil
	return user, err
}

func (db collection) GetUser(input *model.UserInput) (*model.User, error) {
	searchParam := &bson.M{"email": input.Email, "password": input.Password}
	result, err := db.SearchUsers(searchParam)
	if err != nil {
		return nil, err
	}
	return result[0], nil
}

func (db collection) GetUserBySessionID(input *model.SessionID) (*model.User, error) {
	searchParam := &bson.M{"sessionid": input.Sessionid}
	result, err := db.SearchUsers(searchParam)
	if err != nil {
		return nil, err
	}
	return result[0], nil
}

func (db collection) GetUserByID(input *model.ID) (*model.User, error) {
	parsedId, _ := primitive.ObjectIDFromHex(input.ID)
	searchParam := &bson.M{"_id": parsedId}
	result, err := db.SearchUsers(searchParam)
	if err != nil {
		return nil, err
	}
	return result[0], nil
}

func (db collection) SearchUsers(searchParam *bson.M) ([]*model.User, error) {
	cursor, err := db.Find(context.TODO(), searchParam)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())
	var result []*model.User
	for cursor.Next(context.TODO()) {
		var v *model.User
		err = cursor.Decode(&v)
		v.Password = nil
		v.Sessionid = nil
		result = append(result, v)
	}
	if len(result) == 0 {
		return nil, errors.New("user not found")
	}
	return result, err
}

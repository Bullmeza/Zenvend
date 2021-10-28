package repository

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DatabaseController struct {
	User    UserRepository
	Product ProductRepository
}

type collection struct {
	*mongo.Collection
}

const DATABASE = "ZenvendGraphQL"
const MONGO_URI = "mongodb+srv://bullmeza:keExcPWCtGugiMBB@cluster0.svbe7.mongodb.net/Zenvend?retryWrites=true&w=majority"

func InitDatabase() DatabaseController {
	clientOptions := options.Client().ApplyURI(MONGO_URI)
	clientOptions = clientOptions.SetMaxPoolSize(50)

	dbClient, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB")

	return DatabaseController{
		User:    NewUserRepository(dbClient),
		Product: NewProductRepository(dbClient),
	}

}

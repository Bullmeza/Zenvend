package repository

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func parseObjectId(id interface{}) string {
	raw := id.(primitive.ObjectID).String()
	parsed := raw[10 : len(raw)-2]
	return parsed
}

package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"
	"fmt"
	"net/mail"
	"zenvend/graph/generated"
	"zenvend/graph/model"
	"zenvend/repository"
)

func (r *mutationResolver) CreateUser(ctx context.Context, input model.UserInput) (*model.User, error) {
	_, emailInputError := mail.ParseAddress(input.Email)
	if emailInputError != nil {
		return nil, errors.New("invalid email")
	}
	user, err := db.User.CreateUser(&input)
	return user, err
}

func (r *mutationResolver) CreateProduct(ctx context.Context, input model.ProductInput) (*model.Product, error) {
	id, err := db.Product.CreateProduct(&input)
	return id, err
}

func (r *queryResolver) Login(ctx context.Context, input model.UserInput) (*model.User, error) {
	return db.User.GetUser(&input)
}

func (r *queryResolver) GetUserBySessionID(ctx context.Context, input model.SessionID) (*model.User, error) {
	return db.User.GetUserBySessionID(&input)
}

func (r *queryResolver) GetUserByID(ctx context.Context, input model.ID) (*model.User, error) {
	return db.User.GetUserByID(&input)
}

func (r *queryResolver) GetProductsByUser(ctx context.Context, input model.Email) ([]*model.Product, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) GetProductsByLocation(ctx context.Context, input model.LocationSearch) ([]*model.Product, error) {
	return db.Product.SearchProductByLocation(&input)
}

func (r *queryResolver) GetProductByID(ctx context.Context, input model.ID) (*model.Product, error) {
	return db.Product.SearchProductById(&input)
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
var db repository.DatabaseController = repository.InitDatabase()

package main

import (
	"fmt"
	"os"
	"strings"

	"github.com/99designs/gqlgen/api"
	"github.com/99designs/gqlgen/codegen/config"
	"github.com/99designs/gqlgen/plugin/modelgen"
)

func mutateHook(b *modelgen.ModelBuild) *modelgen.ModelBuild {
	for _, model := range b.Models {
		for _, field := range model.Fields {
			name := field.Name
			if field.Type.String() == "*string" {
				omit := strings.TrimSuffix(field.Tag, `"`)
				field.Tag = fmt.Sprintf(`%v,omitempty"`, omit)
			}
			if name == "id" {
				name = "_id"
			}
			field.Tag += ` bson:"` + name + `"`
			if field.Type.String() == "*string" {
				omit := strings.TrimSuffix(field.Tag, `"`)
				field.Tag = fmt.Sprintf(`%v,omitempty"`, omit)
			}
		}
	}
	return b
}

func main() {
	cfg, err := config.LoadConfigFromDefaultLocations()
	if err != nil {
		fmt.Fprintln(os.Stderr, "failed to load config", err.Error())
		os.Exit(2)
	}

	p := modelgen.Plugin{
		MutateHook: mutateHook,
	}

	err = api.Generate(cfg,
		api.NoPlugins(),
		api.AddPlugin(&p),
	)
	if err != nil {
		fmt.Fprintln(os.Stderr, err.Error())
		os.Exit(3)
	}
}

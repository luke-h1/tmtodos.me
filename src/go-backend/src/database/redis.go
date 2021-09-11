package database

import "github.com/go-redis/redis/v8"

var Cache *redis.Client

func SetupRedis() {
	Cache = redis.NewClient(&redis.Options{
		Addr: "redis:12000",
		DB:   0, // single redis instance
	})
}

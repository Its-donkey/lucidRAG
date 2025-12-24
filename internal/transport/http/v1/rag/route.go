package rag

import "github.com/gin-gonic/gin"

func Register(rg *gin.RouterGroup, handler *Handler) {
	r := rg.Group("/rag")
	{
		r.POST("/query", handler.Query)
	}
}

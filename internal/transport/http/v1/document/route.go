package document

import "github.com/gin-gonic/gin"

func Register(rg *gin.RouterGroup, handler *Handler) {
	docs := rg.Group("/documents")
	{
		docs.GET("", handler.List)
		docs.POST("", handler.Create)
		docs.PUT("", handler.Update)
		docs.DELETE("", handler.Delete)
	}
}

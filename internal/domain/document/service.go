package document

import "context"

type Service interface {
	CreateDocument(ctx context.Context, doc *Document) (string, error)
	GetDocument(ctx context.Context, id string) (*Document, error)
	ListDocuments(ctx context.Context, limit, offset int) ([]Document, int64, error)
	UpdateDocument(ctx context.Context, doc *Document) error
	DeleteDocument(ctx context.Context, id string) error
	QueryRAG(ctx context.Context, query RAGQuery) (*RAGResponse, error)
}

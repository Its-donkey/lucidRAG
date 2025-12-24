package document

import (
	"context"
	"errors"
	"time"

	documentDomain "github.com/elprogramadorgt/lucidRAG/internal/domain/document"
)

var (
	ErrDocumentNotFound = errors.New("document not found")
	ErrInvalidQuery     = errors.New("invalid query")
)

type service struct {
	repo documentDomain.Repository
}

func NewService(repo documentDomain.Repository) documentDomain.Service {
	return &service{repo: repo}
}

func (s *service) CreateDocument(ctx context.Context, doc *documentDomain.Document) (string, error) {
	return s.repo.Create(ctx, doc)
}

func (s *service) GetDocument(ctx context.Context, id string) (*documentDomain.Document, error) {
	doc, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if doc == nil {
		return nil, ErrDocumentNotFound
	}
	return doc, nil
}

func (s *service) ListDocuments(ctx context.Context, limit, offset int) ([]documentDomain.Document, int64, error) {
	if limit <= 0 {
		limit = 10
	}
	if limit > 100 {
		limit = 100
	}
	if offset < 0 {
		offset = 0
	}

	docs, err := s.repo.List(ctx, limit, offset)
	if err != nil {
		return nil, 0, err
	}

	total, err := s.repo.Count(ctx)
	if err != nil {
		return nil, 0, err
	}

	return docs, total, nil
}

func (s *service) UpdateDocument(ctx context.Context, doc *documentDomain.Document) error {
	existing, err := s.repo.GetByID(ctx, doc.ID)
	if err != nil {
		return err
	}
	if existing == nil {
		return ErrDocumentNotFound
	}

	doc.UploadedAt = existing.UploadedAt
	return s.repo.Update(ctx, doc)
}

func (s *service) DeleteDocument(ctx context.Context, id string) error {
	existing, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return err
	}
	if existing == nil {
		return ErrDocumentNotFound
	}

	return s.repo.Delete(ctx, id)
}

func (s *service) QueryRAG(ctx context.Context, query documentDomain.RAGQuery) (*documentDomain.RAGResponse, error) {
	start := time.Now()

	if query.Query == "" {
		return nil, ErrInvalidQuery
	}

	if query.TopK <= 0 {
		query.TopK = 5
	}
	if query.Threshold <= 0 {
		query.Threshold = 0.7
	}

	// TODO: Implement actual RAG logic:
	// 1. Generate embedding for query
	// 2. Search for similar chunks in vector store
	// 3. Build context from relevant chunks
	// 4. Generate answer using LLM

	response := &documentDomain.RAGResponse{
		Answer:           "RAG functionality not yet implemented. This is a placeholder response.",
		RelevantChunks:   []documentDomain.Chunk{},
		ConfidenceScore:  0.0,
		ProcessingTimeMs: time.Since(start).Milliseconds(),
	}

	return response, nil
}

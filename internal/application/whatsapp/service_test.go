package whatsapp

import (
	"context"
	"testing"

	whatsappDomain "github.com/elprogramadorgt/lucidRAG/internal/domain/whatsapp"
)

type mockRepo struct{}

func (m *mockRepo) FindByNumber(ctx context.Context, number string) (string, error) {
	return "", nil
}

func TestVerifyWebhook_Success(t *testing.T) {
	svc := NewService(&mockRepo{})

	input := whatsappDomain.HookInput{
		Mode:        "subscribe",
		Challenge:   "test-challenge-123",
		VerifyToken: "my-token",
	}

	challenge, err := svc.VerifyWebhook(input, "my-token")
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	if challenge != "test-challenge-123" {
		t.Errorf("expected challenge 'test-challenge-123', got '%s'", challenge)
	}
}

func TestVerifyWebhook_InvalidToken(t *testing.T) {
	svc := NewService(&mockRepo{})

	input := whatsappDomain.HookInput{
		Mode:        "subscribe",
		Challenge:   "test-challenge",
		VerifyToken: "wrong-token",
	}

	_, err := svc.VerifyWebhook(input, "correct-token")
	if err == nil {
		t.Fatal("expected error for invalid token")
	}

	if err != ErrInvalidToken {
		t.Errorf("expected ErrInvalidToken, got %v", err)
	}
}

func TestVerifyWebhook_InvalidMode(t *testing.T) {
	svc := NewService(&mockRepo{})

	input := whatsappDomain.HookInput{
		Mode:        "unsubscribe",
		Challenge:   "test-challenge",
		VerifyToken: "my-token",
	}

	_, err := svc.VerifyWebhook(input, "my-token")
	if err == nil {
		t.Fatal("expected error for invalid mode")
	}

	if err != ErrInvalidMode {
		t.Errorf("expected ErrInvalidMode, got %v", err)
	}
}

func TestVerifyWebhook_EmptyMode(t *testing.T) {
	svc := NewService(&mockRepo{})

	input := whatsappDomain.HookInput{
		Mode:        "",
		Challenge:   "test-challenge",
		VerifyToken: "my-token",
	}

	_, err := svc.VerifyWebhook(input, "my-token")
	if err != ErrInvalidMode {
		t.Errorf("expected ErrInvalidMode for empty mode, got %v", err)
	}
}

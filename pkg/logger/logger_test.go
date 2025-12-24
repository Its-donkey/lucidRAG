package logger

import (
	"context"
	"testing"
)

func TestNew(t *testing.T) {
	log := New()
	if log == nil {
		t.Fatal("Expected logger to be created, got nil")
	}
}

func TestNewWithOptions(t *testing.T) {
	log := New(Options{Level: "debug", JSON: true, AddSource: true})
	if log == nil {
		t.Fatal("Expected logger to be created, got nil")
	}
}

func TestLoggerMethods(t *testing.T) {
	log := New()

	// These should not panic
	log.Info("Test info message")
	log.Warn("Test warn message")
	log.Error("Test error message")
	log.Debug("Test debug message")
}

func TestLoggerStructuredArgs(t *testing.T) {
	log := New()

	// Test structured logging
	log.Info("user action", "user_id", 123, "action", "login")
}

func TestLoggerWith(t *testing.T) {
	log := New()
	childLog := log.With("service", "whatsapp")

	if childLog == nil {
		t.Fatal("Expected child logger to be created")
	}

	childLog.Info("test message")
}

func TestLoggerWithContext(t *testing.T) {
	log := New()
	ctx := context.WithValue(context.Background(), "request_id", "abc-123")
	ctxLog := log.WithContext(ctx)

	if ctxLog == nil {
		t.Fatal("Expected context logger to be created")
	}
}

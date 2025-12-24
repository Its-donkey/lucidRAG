package logger

import (
	"context"
	"log/slog"
	"os"
)

type Logger struct {
	log *slog.Logger
}

type Options struct {
	Level       string
	JSON        bool
	AddSource   bool
}

func New(opts ...Options) *Logger {
	var opt Options
	if len(opts) > 0 {
		opt = opts[0]
	}

	level := slog.LevelInfo
	switch opt.Level {
	case "debug":
		level = slog.LevelDebug
	case "warn":
		level = slog.LevelWarn
	case "error":
		level = slog.LevelError
	}

	handlerOpts := &slog.HandlerOptions{
		Level:     level,
		AddSource: opt.AddSource,
	}

	var handler slog.Handler
	if opt.JSON {
		handler = slog.NewJSONHandler(os.Stdout, handlerOpts)
	} else {
		handler = slog.NewTextHandler(os.Stdout, handlerOpts)
	}

	return &Logger{log: slog.New(handler)}
}

func (l *Logger) Info(msg string, args ...any) {
	l.log.Info(msg, args...)
}

func (l *Logger) Warn(msg string, args ...any) {
	l.log.Warn(msg, args...)
}

func (l *Logger) Error(msg string, args ...any) {
	l.log.Error(msg, args...)
}

func (l *Logger) Debug(msg string, args ...any) {
	l.log.Debug(msg, args...)
}

func (l *Logger) With(args ...any) *Logger {
	return &Logger{log: l.log.With(args...)}
}

func (l *Logger) WithContext(ctx context.Context) *Logger {
	if requestID, ok := ctx.Value("request_id").(string); ok {
		return l.With("request_id", requestID)
	}
	return l
}

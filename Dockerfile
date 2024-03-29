FROM golang:1.18-alpine3.16 as builder
WORKDIR /docker
COPY backend/go.* ./
COPY backend .
RUN go mod download
RUN go build -o back cmd/main.go

FROM alpine:3.16
WORKDIR /docker
COPY --from=builder /docker/back .
COPY /backend/config/config.dev.yml /docker/config/config.yml
CMD ["./back"]
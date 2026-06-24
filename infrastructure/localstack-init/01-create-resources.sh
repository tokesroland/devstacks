#!/bin/bash
# =============================================================
# LocalStack inicializáló script
# Automatikusan lefut amikor a LocalStack elindul
# Létrehozza az SQS queue-kat és S3 bucket-eket
# =============================================================

set -e

echo ">>> DevStacks LocalStack init indítása..."

AWS_CMD="aws --endpoint-url=http://localhost:4566 --region eu-central-1"

# SQS Queue-k
echo ">>> SQS queue-k létrehozása..."

$AWS_CMD sqs create-queue \
  --queue-name devstacks-jobs-scraped \
  --attributes VisibilityTimeout=300,MessageRetentionPeriod=86400

$AWS_CMD sqs create-queue \
  --queue-name devstacks-jobs-processed \
  --attributes VisibilityTimeout=300,MessageRetentionPeriod=86400

$AWS_CMD sqs create-queue \
  --queue-name devstacks-cv-parsed \
  --attributes VisibilityTimeout=300,MessageRetentionPeriod=86400

$AWS_CMD sqs create-queue \
  --queue-name devstacks-demand-updated \
  --attributes VisibilityTimeout=60,MessageRetentionPeriod=86400

# Dead Letter Queue-k (ha egy üzenet 3x feldolgozás után is hibás)
$AWS_CMD sqs create-queue \
  --queue-name devstacks-jobs-scraped-dlq \
  --attributes MessageRetentionPeriod=604800

$AWS_CMD sqs create-queue \
  --queue-name devstacks-jobs-processed-dlq \
  --attributes MessageRetentionPeriod=604800

# S3 Bucket-ek
echo ">>> S3 bucket-ek létrehozása..."

$AWS_CMD s3api create-bucket \
  --bucket devstacks-raw-html \
  --create-bucket-configuration LocationConstraint=eu-central-1

$AWS_CMD s3api create-bucket \
  --bucket devstacks-cv-files \
  --create-bucket-configuration LocationConstraint=eu-central-1

$AWS_CMD s3api create-bucket \
  --bucket devstacks-frontend \
  --create-bucket-configuration LocationConstraint=eu-central-1

# S3 lifecycle: nyers HTML 90 nap után törlődik
$AWS_CMD s3api put-bucket-lifecycle-configuration \
  --bucket devstacks-raw-html \
  --lifecycle-configuration '{
    "Rules": [{
      "ID": "delete-old-html",
      "Status": "Enabled",
      "Expiration": {"Days": 90},
      "Filter": {"Prefix": "raw/"}
    }]
  }'

echo ">>> LocalStack init kész!"
echo ">>> Létrehozott SQS queue-k:"
$AWS_CMD sqs list-queues

echo ">>> Létrehozott S3 bucket-ek:"
$AWS_CMD s3api list-buckets

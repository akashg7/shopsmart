output "s3_bucket_name" {
  value = aws_s3_bucket.tf_state.bucket
}

output "ecr_repository_url" {
  value = aws_ecr_repository.shopsmart_repo.repository_url
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  value = aws_ecs_service.shopsmart_service.name
}

output "info" {
  value = "Note: Access the service via the public IP of the Fargate task on port 3000"
}

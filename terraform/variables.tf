variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "us-east-1"
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "shopsmart"
}

variable "container_port" {
  description = "Port exposed by the docker image"
  type        = number
  default     = 3000
}

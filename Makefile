CUR_DIR := `pwd`

default:
		@echo
		@echo "Usage:"
		@echo "   make [task]"
		@echo
		@echo "Tasks:"
		@echo "   deploy-s3                     Execute deploy to s3"
		@echo "   deploy-lambda                 Execute deploy to lambda"
		@echo "   clear-cache                   Execute cloudfront clear cache"

deploy-s3:
		aws s3 sync $(CUR_DIR)/s3-web/public/ s3://itinao-test --delete

deploy-lambda:
		@if [ ! -d ./.tmp ]; \
			then echo "mkdir -p ./.tmp"; mkdir -p ./.tmp; \
		fi
		cd lambda-func && zip -r ../.tmp/lambda-func.zip index.js node_modules
		aws lambda update-function-code \
			--function-name hello_function \
			--zip-file fileb://.tmp/lambda-func.zip \
			--publish

clear-cache:
		aws cloudfront create-invalidation --distribution-id E1OJ34BPFDJM5X --paths '/*'


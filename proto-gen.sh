#!/bin/bash

mkdir -p ./src/shared/proto
protoc \
    --plugin=protoc-gen-ts_proto=".\node_modules\.bin\protoc-gen-ts_proto.cmd" \
    --ts_proto_out=./src/shared/proto \
    --proto_path=./proto \
    -I./proto ./proto/*/*/*.proto \
    --ts_proto_opt=env=browser,useExactTypes=false,outputTypeRegistry=false,outputServices=generic-definitions,outputServices=nice-grpc,stringEnums=true,oneof=unions-value,esModuleInterop=true \
    --descriptor_set_out=./src/shared/proto/protoset.bin \

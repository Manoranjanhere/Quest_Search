import * as grpcWeb from 'grpc-web';

import * as search_pb from './search_pb';


export class SearchServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  search(
    request: search_pb.SearchRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: search_pb.SearchResponse) => void
  ): grpcWeb.ClientReadableStream<search_pb.SearchResponse>;

}

export class SearchServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  search(
    request: search_pb.SearchRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<search_pb.SearchResponse>;

}


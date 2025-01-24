// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var search_pb = require('./search_pb.js');

function serialize_search_SearchRequest(arg) {
  if (!(arg instanceof search_pb.SearchRequest)) {
    throw new Error('Expected argument of type search.SearchRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_search_SearchRequest(buffer_arg) {
  return search_pb.SearchRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_search_SearchResponse(arg) {
  if (!(arg instanceof search_pb.SearchResponse)) {
    throw new Error('Expected argument of type search.SearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_search_SearchResponse(buffer_arg) {
  return search_pb.SearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var SearchServiceService = exports.SearchServiceService = {
  search: {
    path: '/search.SearchService/Search',
    requestStream: false,
    responseStream: false,
    requestType: search_pb.SearchRequest,
    responseType: search_pb.SearchResponse,
    requestSerialize: serialize_search_SearchRequest,
    requestDeserialize: deserialize_search_SearchRequest,
    responseSerialize: serialize_search_SearchResponse,
    responseDeserialize: deserialize_search_SearchResponse,
  },
};

exports.SearchServiceClient = grpc.makeGenericClientConstructor(SearchServiceService);

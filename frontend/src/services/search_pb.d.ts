import * as jspb from 'google-protobuf'



export class SearchRequest extends jspb.Message {
  getQuery(): string;
  setQuery(value: string): SearchRequest;

  getPage(): number;
  setPage(value: number): SearchRequest;

  getLimit(): number;
  setLimit(value: number): SearchRequest;

  getType(): string;
  setType(value: string): SearchRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SearchRequest): SearchRequest.AsObject;
  static serializeBinaryToWriter(message: SearchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchRequest;
  static deserializeBinaryFromReader(message: SearchRequest, reader: jspb.BinaryReader): SearchRequest;
}

export namespace SearchRequest {
  export type AsObject = {
    query: string,
    page: number,
    limit: number,
    type: string,
  }
}

export class SearchResponse extends jspb.Message {
  getQuestionsList(): Array<Question>;
  setQuestionsList(value: Array<Question>): SearchResponse;
  clearQuestionsList(): SearchResponse;
  addQuestions(value?: Question, index?: number): Question;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SearchResponse): SearchResponse.AsObject;
  static serializeBinaryToWriter(message: SearchResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchResponse;
  static deserializeBinaryFromReader(message: SearchResponse, reader: jspb.BinaryReader): SearchResponse;
}

export namespace SearchResponse {
  export type AsObject = {
    questionsList: Array<Question.AsObject>,
  }
}

export class Question extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): Question;

  getType(): string;
  setType(value: string): Question;

  getOptionsList(): Array<Option>;
  setOptionsList(value: Array<Option>): Question;
  clearOptionsList(): Question;
  addOptions(value?: Option, index?: number): Option;

  getSolution(): string;
  setSolution(value: string): Question;

  getBlocksList(): Array<Block>;
  setBlocksList(value: Array<Block>): Question;
  clearBlocksList(): Question;
  addBlocks(value?: Block, index?: number): Block;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Question.AsObject;
  static toObject(includeInstance: boolean, msg: Question): Question.AsObject;
  static serializeBinaryToWriter(message: Question, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Question;
  static deserializeBinaryFromReader(message: Question, reader: jspb.BinaryReader): Question;
}

export namespace Question {
  export type AsObject = {
    title: string,
    type: string,
    optionsList: Array<Option.AsObject>,
    solution: string,
    blocksList: Array<Block.AsObject>,
  }
}

export class Option extends jspb.Message {
  getText(): string;
  setText(value: string): Option;

  getIscorrectanswer(): boolean;
  setIscorrectanswer(value: boolean): Option;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Option.AsObject;
  static toObject(includeInstance: boolean, msg: Option): Option.AsObject;
  static serializeBinaryToWriter(message: Option, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Option;
  static deserializeBinaryFromReader(message: Option, reader: jspb.BinaryReader): Option;
}

export namespace Option {
  export type AsObject = {
    text: string,
    iscorrectanswer: boolean,
  }
}

export class Block extends jspb.Message {
  getText(): string;
  setText(value: string): Block;

  getShowinoption(): boolean;
  setShowinoption(value: boolean): Block;

  getIsanswer(): boolean;
  setIsanswer(value: boolean): Block;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Block.AsObject;
  static toObject(includeInstance: boolean, msg: Block): Block.AsObject;
  static serializeBinaryToWriter(message: Block, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Block;
  static deserializeBinaryFromReader(message: Block, reader: jspb.BinaryReader): Block;
}

export namespace Block {
  export type AsObject = {
    text: string,
    showinoption: boolean,
    isanswer: boolean,
  }
}


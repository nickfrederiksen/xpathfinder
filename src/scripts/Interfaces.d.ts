declare interface INode {
	id: string;
	udi: string;
	selected?: boolean;
	metaData: {
		contentType?: string;
		ContentTypeAlias?: string;
	};
	parent?: () => INode;
	parentId: string | number;
	path: string;
}

declare interface IContent {
	id: number;
	parentId?: number;
	contentTypeAlias: string;
}

declare interface IEntity{
	
}
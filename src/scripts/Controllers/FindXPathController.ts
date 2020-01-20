class FindXPathController {
	private selection: INode | null = null;
	public siteXPath: string | null;
	public rootXPath: string | null;
	public specificXPath: string | null;

	constructor(
		$scope: IFindXPathControllerScope,
		private contentResource: umbraco.resources.IContentResource,
		private notificationsService: umbraco.services.INotificationsService) {
		this.setXPaths();
		$scope.model = {
			selection: [],
			select: this.select,
		};
	}

	public select = (node: INode) => {
		node.selected = node.selected === true ? false : true;

		if (this.selection != null) {
			this.selection.selected = false;
		}

		this.setXPaths();

		if (node.selected === true) {
			this.selection = node;
			this.getXPath(node);
		} else {
			this.selection = null;
		}
	}

	public copySuccess = (xpath: string) => {
		this.notificationsService.success("Success", `XPath, '${xpath}', copied to clipboard!`);
	}

	private getXPath(node: INode) {
		const pathIds = node.path.split(/,/g).slice(1).map((id) => parseInt(id, 10));
		this.contentResource.getByIds(pathIds).then((response) => {
			const ancestorsAndSelf = response as unknown as IContent[];
			this.setXPaths(ancestorsAndSelf);
		});
	}

	private setXPaths(content?: IContent[]) {

		if (content == null || content.length === 0) {
			this.rootXPath = this.siteXPath = this.specificXPath = null;

		} else {
			let doctypeAliases = content.map((n) => n.contentTypeAlias);

			this.rootXPath = `$root/${doctypeAliases.join("/")}`.replace(/\/$/, "");
			this.siteXPath = `$site/${doctypeAliases.slice(1).join("/")}`.replace(/\/$/, "");

			const root = content[0];
			const subPages = content.slice(1);
			doctypeAliases = subPages.map((n) => n.contentTypeAlias);

			this.specificXPath = `/root/${root.contentTypeAlias}[@id=${root.id}]/${doctypeAliases.join("/")}`.replace(/\/$/, "");
		}
	}
}

angular.module("umbraco").controller("xpathfinder.findxpathcontroller",
	[
		"$scope",
		"contentResource",
		"notificationsService",
		FindXPathController,
	]);

interface IPickerModel {
	selection: INode[];
	select: (node: INode) => void;
}

declare interface IFindXPathControllerScope extends ng.IScope {
	model: IPickerModel;
}
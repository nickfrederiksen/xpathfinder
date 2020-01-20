class XPathController {
	public xpath: string | null;
	public result: unknown[] | null = null;
	public listViewOptions: object;

	private layouts = [
		{
			name: "List",
			path: "views/propertyeditors/listview/layouts/list/list.html",
			icon: "icon-list",
			isSystem: 1,
			selected: true,
		},
	];

	constructor(
		_$scope: ng.IScope,
		private entityResource: umbraco.resources.IEntityResource,
		private $routeParams: any,
		private listViewHelper: any) {

		this.listViewOptions = {
			pageSize: 10,
			pageNumber: 1,
			filter: "",
			orderBy: "VersionDate",
			orderDirection: "desc",
			orderBySystemField: true,
			includeProperties: [
				{
					alias: "updateDate",
					header: "Last edited",
					isSystem: 1,
				},
				{
					alias: "updater",
					header: "Last edited by",
					isSystem: 1,
				},
			],
			layout: {
				layouts: this.layouts,
				activeLayout: this.listViewHelper.getLayout("content", this.layouts),
			},
			allowBulkPublish: false,
			allowBulkUnpublish: false,
			allowBulkCopy: false,
			allowBulkMove: false,
			allowBulkDelete: false,
			cultureName: this.$routeParams.cculture ? this.$routeParams.cculture : this.$routeParams.mculture,
		};
	}

	public findContent = () => {
		this.result = null;
		if (this.xpath != null) {
			this.entityResource.getByQuery(this.xpath, -1, "Document").then((response) => {
				console.debug(response);
				this.result = [response];
			});
		}
	}
}

angular.module("umbraco").controller("xpathfinder.xpathcontroller",
	[
		"$scope",
		"entityResource",
		"$routeParams",
		"listViewHelper",
		XPathController,
	]);
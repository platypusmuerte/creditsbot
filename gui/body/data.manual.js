const { constants } = require('../../constants');
const { BodyBase } = require("./body.base");

class DataManual extends BodyBase {
	constructor(params) {
		super();
		this.utils = params.utils;
		this.db = params.db;
		this.dataDir = params.dataDir;
		this.userArgs = params.userArgs;
		this.page = params.page;
		this.subPage = params.subpage;
		this.data;
	}

	getDatabases(excludes) {
		let ex = excludes||[];

		return Object.entries(constants.DATABASE_NAMES).map(([k, v]) => {
			return (ex.includes(v)) ? ``:`<option value="${v}">${v}</option>`;
		}).join("");
	}

	render(qData) {
		this.data = qData;

		return `
		<script>${this.js()}</script>
		<div class="jumbotron homeBanner">
			<h1 class="display-4">Manual Data Queries</h1>
			<p class="lead">Query the databases manually</p>
			<hr class="my-4">

			<label class="formLabel dividerLabel">Remove User</label>
			
			<div class="row justify-content-start queryRow">
				<div class="col-2">
					<input type="text" class="form-control textInput" id="removeuser" value="" placeholder="username here">
				</div>
				<div class="col">
					<button id="removeusersub" type="button" class="btn btn-primary mb-2">Remove User</button><span id="removeusersuccess" class="badge badge-success formSuccess invisible">Query Sent</span>
				</div>
			</div>

			<label class="formLabel">Add To User</label>
			<p>Calls to non-historical databases here still results in historical updates. (ex: bits adds to bits and hbits)</p>

			<div class="row justify-content-start queryRow">
				<div class="col-2">
					<select class="form-control" id="addtouserdb">${this.getDatabases(["streamloots","hstreamloots"])}</select>
				</div>
				<div class="col-2">
					<input type="text" class="form-control textInput" id="addtouser" value="" placeholder="username here">
				</div>
				<div class="col-1">
					<input type="number" class="form-control numberInput" id="addtouserval" value="1">
				</div>
				<div class="col">
					<button id="addtousersub" type="button" class="btn btn-primary mb-2">Add To User</button><span id="addtousersuccess" class="badge badge-success formSuccess invisible">Query Sent</span>
				</div>
			</div>

			<label class="formLabel">Add To User StreamLoots</label>
			<p>This will also add to historical StreamLoots counts</p>

			<div class="row justify-content-start queryRow">
				<div class="col-2">
					<input type="text" class="form-control textInput" id="addtosluser" value="" placeholder="username here">
				</div>
				<div class="col-2">
					<input type="text" class="form-control textInput" id="addtoslusercard" value="" placeholder="card url here">
				</div>
				<div class="col-1">
					<input type="number" class="form-control numberInput" id="addtosluserval" value="1">
				</div>
				<div class="col">
					<button id="addtoslusersub" type="button" class="btn btn-primary mb-2">Add To User</button><span id="addtoslusersuccess" class="badge badge-success formSuccess invisible">Query Sent</span>
				</div>
			</div>

			<label class="formLabel">Lookup User</label>

			<div class="row justify-content-start">
				<div class="col-2">
					<select class="form-control" id="lookupuserdb">${this.getDatabases(["bans", "follows", "mods", "patreons", "vips"])}</select>
				</div>
				<div class="col-2">
					<input type="text" class="form-control textInput" id="lookupuser" value="" placeholder="username here">
				</div>
				<div class="col">
					<button id="lookupusersub" type="button" class="btn btn-primary mb-2">Lookup</button><span id="lookupusersuccess" class="badge badge-success formSuccess invisible">Query Sent</span>
				</div>
			</div>
			<div class="row justify-content-start queryRow">
				<div class="col-4">
					<textarea class="form-control" id="lookupuserresults" rows="3"></textarea>
				</div>
			</div>

			<label class="formLabel">Top Queries</label>

			<div class="row justify-content-start">
				<div class="col-1">
					<select class="form-control" id="topsusertype"><option value="5">5</option><option value="10">10</option></select>
				</div>
				<div class="col-2">
					<select class="form-control" id="topsuserdb">${this.getDatabases(["bans", "chatters", "follows", "mods", "patreons", "vips"])}</select>
				</div>
				<div class="col">
					<button id="topsusersub" type="button" class="btn btn-primary mb-2">Lookup</button><span id="topsusersuccess" class="badge badge-success formSuccess invisible">Query Sent</span>
				</div>
			</div>
			<div class="row justify-content-start queryRow">
				<div class="col-5">
					<textarea class="form-control" id="topsuserresults" rows="3"></textarea>
				</div>
			</div>
		</div>
		`;
	}

	js() {
		return `
		function init_data_manual() {
			$("#removeusersub").on("click",(e)=>{
				if($("#removeuser").val().length) {
					call("remove/" + $("#removeuser").val(), (data)=>{});
					$("#removeusersuccess").removeClass("invisible").addClass("visible");
					setTimeout(()=>{
						$("#removeusersuccess").removeClass("visible").addClass("invisible");
					},2000);
					$("#removeuser").val("");
				}
			});

			$("#addtoslusersub").on("click",(e)=>{
				if($("#addtosluser").val().length && $("#addtoslusercard").val().length && $("#addtosluserval").val().length) {
					call("add/streamloots/" + $("#addtosluser").val() + "/" + $("#addtosluserval").val() + "?card=" + $("#addtoslusercard").val(), (data)=>{});
					$("#addtoslusersuccess").removeClass("invisible").addClass("visible");
					setTimeout(()=>{
						$("#addtoslusersuccess").removeClass("visible").addClass("invisible");
					},2000);
					$("#addtosluser").val("");
					$("#addtoslusercard").val("");
				}
			});

			$("#addtousersub").on("click",(e)=>{
				if($("#addtouser").val().length && $("#addtouserval").val().length) {
					call("add/" + $("#addtouserdb").val() + "/" + $("#addtouser").val() + "/" + $("#addtouserval").val(), (data)=>{});
					$("#addtousersuccess").removeClass("invisible").addClass("visible");
					setTimeout(()=>{
						$("#addtousersuccess").removeClass("visible").addClass("invisible");
					},2000);
					$("#addtouser").val("");
				}
			});

			$("#lookupusersub").on("click",(e)=>{
				if($("#lookupuser").val().length) {
					call("get/" + $("#lookupuserdb").val() + "/" + $("#lookupuser").val(), (data)=>{
						$("#lookupuserresults").val(data);
						$("#lookupusersuccess").removeClass("invisible").addClass("visible");
						setTimeout(()=>{
							$("#lookupusersuccess").removeClass("visible").addClass("invisible");
						},2000);
					});
				}
			});

			$("#topsusersub").on("click",(e)=>{				
				call("top" + $("#topsusertype").val() + "/" + $("#topsuserdb").val(), (data)=>{
					$("#topsuserresults").val(data);
					$("#topsusersuccess").removeClass("invisible").addClass("visible");
					setTimeout(()=>{
						$("#topsusersuccess").removeClass("visible").addClass("invisible");
					},2000);
				});
			});
		}

		function call(url, cb) {
			$.ajax({
				type: "GET",
				url: "http://localhost:${this.userArgs.PORT}/" + url
			}).done((data)=>{
				cb(data);
			});
		}

		$(document).ready(() => {
			init_data_manual();
		});
		`;
	}
}

exports.DataManual = DataManual;
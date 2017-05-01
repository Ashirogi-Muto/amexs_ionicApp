import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class UserPageService {
	constructor(private http: Http) { }
	private headers: any;
	private options: any;

	formatMapData(data) {
		let body = data;
		let str: string = "";
		body.forEach(function (value, key) {
			if (str != "") {
				str += "&";
			}
			str += key + "=" + encodeURIComponent(value);
		}, body);
		return str;
	}

	setHeaders() {
		this.headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded, multipart/form-data'
		});
		this.options = new RequestOptions({
			headers: this.headers
		});
		return this.options;
	}

	fetchProducts() {
		return this.http.get('http://hissaria.in/Amexs_API/controllers/FetchProducts.php')
			.map((res: Response) => {
				return res.json();
			},
			(error) => {
				return error;
			});
	}

	fetchSingleProduct(id) {
		return this.http.get('http://hissaria.in/Amexs_API/controllers/FetchSingleProduct.php?id=' + id)
			.map((res: Response) => {
				return res.json();
			}, error => {
				return error;
			});
	}

	private extractData(res: Response) {
		console.log(res);
		if (res.status < 200 || res.status >= 300) {
			throw new Error('Bad response status: ' + res.status);
		}
		let result = res.json();
		return result || {};
	}
	private handleError(error: Response) {
		return Observable.throw(error.json() || 'Server error');
	}
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const baseUrl = 'http://localhost:8034/api/products';
const baseUrl2 = 'http://localhost:8034/api/product';

const httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
 };


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(`${baseUrl2}/${id}`);
  }

  create(data)  {
    return this.http.post(baseUrl, data);
  }

  // create(data) : Observable<any>  {
  //   return this.http.post(baseUrl, data , httpOptions);
  // }
  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByTitle(title) {
    return this.http.get(`${baseUrl}?title=${title}`);
  }

  addUploadData(selectedFile) {
    return this.http.post('http://localhost:8034/products/upload', selectedFile);
  }

  findProduct(id) {
    return this.http.get(`${baseUrl}/F/${id}`);
  }


  
  category(cat) {
    return this.http.get(`${baseUrl}/category/${cat}`);
  }

  publish(id) {
    return this.http.get(`${baseUrl}/publish/${id}`);
  }

  findProducts(id){ return this.http.get(`${baseUrl}/${id}`);}
}

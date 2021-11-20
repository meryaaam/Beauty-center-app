import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guard/auth-guard.guard';
import { RoleGuard } from './Guard/role-guard.guard';

const routes: Routes = [
  { path: 'profile', redirectTo: 'fprofile', pathMatch: 'full' },
{
path: '',
loadChildren: () => import('./index/index.module').then(m => m.IndexPageModule)
},
{
path: 'home',
loadChildren: () => import('../app/pages/home/home.module').then(m => m.HomePageModule)
},
  
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule),
    canActivate: [AuthGuard ] 
  }
  ,
  {
    path: 'category/:catTitle',
    loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule),
    canActivate: [AuthGuard ] 
  },
  {
    path: 'admin',
    // tslint:disable-next-line: max-line-length
    loadChildren: () => import('./admin/Admin/admin.module').then( m => m.AdminPageModule),
    canActivate: [AuthGuard , RoleGuard] , data: {expectedRole: 'ROLE_ADMIN' }
  },

  {
    path: 'udetail',
    loadChildren: () => import('./pages/udetail/udetail.module').then( m => m.UdetailPageModule),
   canActivate: [AuthGuard ] 
  },
  {
    path: 'feed',
    loadChildren: () => import('./pages/feed/feed.module').then( m => m.FeedPageModule),
   canActivate: [AuthGuard ] 
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product/product.module').then( m => m.ProductPageModule),
    canActivate: [AuthGuard ]  
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user/user.module').then( m => m.UserPageModule),
    canActivate: [AuthGuard , RoleGuard] , data: {expectedRole: 'ROLE_ADMIN' }
  },
  {
    path: 'seller/register',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },

  {
    path: 'ps',
    loadChildren: () => import('./pages/psword/psword.module').then( m => m.PswordPageModule),
    // canActivate: [AuthGuard , RoleGuard] , data: {expectedRole: 'ROLE_ADMIN' }
  },





  
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },






];
@NgModule({
imports: [
RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
],
exports: [RouterModule]
})
export class AppRoutingModule {}

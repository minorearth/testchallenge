import { cookies } from "next/headers";
// import {getSession} from './session'

export function middleware(request) {
    // const currentUser = request.cookies.get('currentUser')?.value
    const session = request.cookies.get('session');

    // const currentUser=true
    // const smth =  getSession();
    // const smth =  false;
    if (!session && request.nextUrl.pathname.startsWith('/main')) {
      return Response.redirect(new URL('/', request.url))
    }
    
   
    // if (!currentUser) {
    //   return Response.redirect(new URL('/', request.url))
    // }
  }
   
//   export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
//   }
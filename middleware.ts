import { type NextRequest, NextResponse } from "next/server";
import * as jose from 'jose';
import { jwt } from "./utils";

export async function middleware( req: NextRequest ) {
  const catchedPage = req.nextUrl.pathname;

  if ( catchedPage.startsWith("/checkout") ) {

    const token = req.cookies.get("token")?.value;

    if ( !token ) return NextResponse.redirect(new URL(`/auth/login?p=${catchedPage}`, req.url))

    try {

      // await jwt.isValidToken( token );
      await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));

      return NextResponse.next();
    } catch (error) {
      return  NextResponse.redirect(new URL(`/auth/login?p=${catchedPage}`, req.url));
    }    

  }
}

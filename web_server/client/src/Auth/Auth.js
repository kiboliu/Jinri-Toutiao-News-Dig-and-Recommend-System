// read and write token: used for mark logged-in users and then load more news
class Auth {
   static authenticateUser(token, email) {
       localStorage.setItem('token', token);
       localStorage.setItem('email', email);
   }

   //just judge if token exists, cannot judge if it's right or not
   static isUserAuthenticated() {
       return localStorage.getItem('token') !== null;
   }

   static deauthenticateUser() {
       localStorage.removeItem('token');
       localStorage.removeItem('email');
   }

   static getToken() {
       return localStorage.getItem('token');
   }

   static getEmail() {
       return localStorage.getItem('email');
   }
}

export default Auth;
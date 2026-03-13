export function checkAuth(request) {

const authHeader = request.headers.get("authorization");

if (!authHeader) {
return false;
}

const base64 = authHeader.split(" ")[1];

const decoded = atob(base64);

const [user, password] = decoded.split(":");

if (user === "admin" && password === "1234") {
return true;
}

return false;

}
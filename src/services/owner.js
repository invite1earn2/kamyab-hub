export function checkOwner(){

const role =
localStorage.getItem(
"user_role"
);

return role==="owner";

}
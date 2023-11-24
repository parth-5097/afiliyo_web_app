$ans `curl http://localhost:5000/api/temp`
$str 'true'
if ["$ans" = "$str"];
then  
echo "cleaning process completed"
else 
echo "check your code or check that folder exist or maybe server is not running, for more information check your server log"
fi
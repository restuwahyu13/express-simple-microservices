#/!/bin.sh

echo -n "enter environment type ? "
read type

if [ "$type"  == "prod" ]
then
    npm run start
else
    npm run dev
fi

exit
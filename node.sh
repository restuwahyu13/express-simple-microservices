#/!/bin.sh

echo -n "enter type environment ? "
read type

if [ "$type"  == "prod" ]
then
    npm run start
else
    npm run dev
fi

exit
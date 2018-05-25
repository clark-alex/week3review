update products 
set item=$2, price=$3, quantity=$4
where id = $1;
select * from products
order by id;
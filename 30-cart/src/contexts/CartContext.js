import React, { useState, createContext } from 'react';

export const CartContext = createContext({});

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    function addItemCart(newItem) {
        // Verificar se o item existe, se sim pega a posição/ index
        const indexItem = cart.findIndex(item => item.id === newItem.id)

        // Se o item ja existe no caarinho ele adicona mais um 1 a quantidade da lista

        if (indexItem !== -1) {
            // Criar uma copia so array atual do carrinho
            let carList = [...cart];

            // Pega a quantidade  existente e soma + 1 da mesma 
            carList[indexItem].amount = carList[indexItem].amount + 1;

            // Pega o preço do valor unitario do produto pela quantidade somada anterior
            carList[indexItem].total = cart[indexItem].amount * carList[indexItem].price;

            // Setando lista
            setCart(carList)
            totalResultCart(carList);

            // teste de exibição
            // console.log("Item ja existia, quantidade atualizada:", carList);
            return;
        }

        // Se o produto ainda não existe no carrinho, ele adiciona primeiramente
        let data = {
            ...newItem,
            amount: 1,
            total: newItem.price
        }

        setCart(products => [...products, data]);
        totalResultCart([...cart, data])

        // teste exibição no console
        // console.log("Novo item adicionado:", [...cart, data]);
    }

    function removeItemCart(product) {
        // Verifica se o item existe, se sim pega a posição/index
        const indexItem = cart.findIndex(item => item.id === product.id)

        // Se o tem no carrinho maior que um, se existir itens
        if (cart[indexItem]?.amount > 1) {

            // Crie uma copia do array atual do carrinho
            let carList = [...cart]

            // Pega a quantidade existente e subtrai -1 da mesma
            carList[indexItem].amount = carList[indexItem].amount - 1;

            //Pega o preço do valor total e subtrai o valor unitario
            cart[indexItem].total =  cart[indexItem].total - carList[indexItem].price;
            
            setCart(carList);
            totalResultCart(carList);
            return;
        }
        // se o produto não tiver id, não existe e ele é removido da lista
        const removeItem =  cart.filter(item => item.id !== product.id)
        setCart(removeItem);
        totalResultCart(removeItem);
       
    }

    function totalResultCart(items){
        let myCart =  items;

        //Acumulador de objetos

        let result =  myCart.reduce((acc, obj) => { return acc + obj.total}, 0)

        setTotal(result);
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addItemCart,
                removeItemCart,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
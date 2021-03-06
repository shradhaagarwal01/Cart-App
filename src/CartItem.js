    //As this component does not contain state now,
    //we changed it to function component
    //neeed  to bind event handlers
    // if we dont use arrow functions

    // increaseQuantity = () => {
    //     // first way(use when you don't require 
    //     //previous state like changing title here)
    //     // this.setState({
    //     //     qty: this.state.qty+1
    //     // })

    //     //second way(use when you require previous state)
    //     this.setState((prevState) => {
    //      return{
    //           qty: prevState.qty +1
    //            }
    //     })
    // }

    // decreaseQuantity = () => {
    //     this.setState((prevState) => {
    //         if (prevState.qty>0){
    //         return{
    //             qty: prevState.qty-1
    //         }
    //     }
    //     })
    // }
    

const CartItem = (props) => {
        const {price,title,qty} = props.product
        const {
            product,
            onIncreaseQuantity,
            onDecreaseQuantity,
            onDeleteProduct
          } = props;
        return (
            <div className='cart-item'>
                <div className="left-block">
                    <img alt="productImage" style={styles.image} src={product.img} />
                </div>
                <div className="right-block">
                    <div style={ { fontSize: 25 } }>{title}</div>
                    <div style={ { color: '#777' } }>Rs {price} </div>
                    <div style={ { color: '#777' } }>Qty: {qty} </div>
                    <div className="cart-item-actions">
                        <img 
                            alt="increase" 
                            className="action-icons" 
                            src="https://bit.ly/3vdXp9s" 
                            onClick={() => onIncreaseQuantity(product)}
                        />
                        <img 
                            alt="decrease" 
                            className="action-icons" 
                            src="https://bit.ly/2OkwEji"
                            onClick={() => onDecreaseQuantity(product)}
                        />
                        <img 
                            alt="delete" 
                            className="action-icons" 
                            src="https://bit.ly/3vhuK3o" 
                            onClick={() => onDeleteProduct(product.id)}
                        />
                    </div>
                </div>
            </div>
        );
}

const styles = {
    image: {
      height: 110,
      width: 110,
      borderRadius: 4,
      background: '#ccc'
    }
  }


export default CartItem

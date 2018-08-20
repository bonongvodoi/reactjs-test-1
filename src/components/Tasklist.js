import React from 'react';
import Taskitem from './Taskitem';
import moment from 'moment';


class Tasklist extends React.Component {
    constructor() {
        super();

        this.state = {
            sort: ''
        }
    }
    handleSort (column) {
        //this.props.handleSort(column)
        this.setState({ sort: column })
    }

    getProductsAfterSort() {
        // SET SORT CÁCH 1
        // if (this.state.sort) {
        //     return this.props.products.sort((a,b) => a[this.state.sort] - b[this.state.sort])
        // } else {
        //     return this.props.products
        // }


        // SET SORT CÁCH 2
        switch (this.state.sort) {
            case 'size':
                return this.props.products.sort((a,b) => a.size - b.size);
            case 'price':
                return this.props.products.sort((a,b) => a.price - b.price);
            case 'id':
                return this.props.products.sort((a,b) => a.id - b.id);
            default:
                return this.props.products 
        }
    }

    render () {
        var products = this.getProductsAfterSort();
        var elmProducts = products.map((p, index) => {
            return index % 20  === 19 ?  
                <tr key={p.id}>
                    <td colSpan="5"><img className="ads" src={`/ads/?r=${Math.floor(Math.random()*1000)}`}/></td>
                </tr>
                    :
                <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency:'USD',
                        minimumFractionDigits:0,
                        maximumFractionDigits:0
                    }).format(p.price)}
                    </td>
                    <td>{p.size}</td>
                    <td style={{fontSize: p.size}}>{p.face}</td>
                    <td>
                        {moment().diff(moment(p.date), 'days') <= 7 ?
                            moment(p.date).fromNow() 
                            : moment(p.date).format('DD/MM/YYYY')  
                        }
                    </td>
                </tr>
          });
        return (
            <div>
                <table className="table table-bordered">
                    <Taskitem handleSort={this.handleSort.bind(this)} />
                    <tbody className="text-center">
                        {elmProducts}
                    </tbody>
                </table>
                {this.props.isLoading && 
                    <div className="text-center" >
                        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                    </div>}
                {this.props.noMore && <div className="text-center" >~ end of catalogue ~</div>}
            </div>
        );
    }
}

export default Tasklist;

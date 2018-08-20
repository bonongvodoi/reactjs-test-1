import React from 'react';



class Taskitem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleColumClick (column) {
        this.props.handleSort(column);
      }
    
   
    render () {
        
        return (
            <thead>
                <tr>
                    <th className="text-center" onClick={this.handleColumClick.bind(this,'id')}>ID</th>
                    <th className="text-center" onClick={this.handleColumClick.bind(this,'price')}>PRICE</th>
                    <th className="text-center" onClick={ this.handleColumClick.bind(this, 'size') }>SIZE</th>
                    <th className="text-center">FACE</th>
                    <th className="text-center">DATE</th>
                </tr>
            </thead>
        );
    }
}

export default Taskitem;
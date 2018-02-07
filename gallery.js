
const NavBar = (props) => {
    const getPageStyle = (page, currentPage) => {
        if (page === currentPage) {
            return "nav-item active"
        }
        return "nav-item"
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">redzigzag</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className={getPageStyle('info', props.page)}>
                <a className="nav-link" onClick={() => props.setPage('info')} href="#">Info</a>
            </li>
            <li className={getPageStyle('gallery', props.page)}>
                <a className="nav-link" onClick={() => props.setPage('gallery')} href="#">Zdjecia</a>
            </li>
            <li className={getPageStyle('order', props.page)}>
                <a className="nav-link" onClick={() => props.setPage('order')} href="#">Zamow</a>
            </li>
            </ul>
        </div>
        </nav>
    )
}

const GalleryCard = (props) => {
    const getCardStyle = (number) => {
        if (number > 0) {
            return "card text-white bg-success mb-3"
        }
        return "card"
    }

    const getItemStype = (number, selectedNumber) => {
        if (number === selectedNumber) {
            return "dropdown-item active"
        }
        return "dropdown-item"
    }

    return (
        <div className={getCardStyle(props.count)}>
            <img className="card-img-top" src={props.image} alt="Card image cap" />
            <div className="card-body">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                        {props.count}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className={getItemStype(0, props.count)} onClick={() => {props.updateImageCount(props.image, 0)}}>0</a>
                    <a className={getItemStype(1, props.count)} onClick={() => {props.updateImageCount(props.image, 1)}}>1</a>
                    <a className={getItemStype(2, props.count)} onClick={() => {props.updateImageCount(props.image, 2)}}>2</a>
                    <a className={getItemStype(3, props.count)} onClick={() => {props.updateImageCount(props.image, 3)}}>3</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Info = (props) => {
    return (
        <div>
            Info
        </div>
    )
}

const OrderDetail = (props) => {
    return (
        <tr>
            <td>
                <img src={props.image} width='30px'/>
            </td>
            <td>
                {props.count}
            </td>
        </tr>
    )
}

const Order = (props) => {
    let images = []
    let total = 0
    for (var key in props.images) {
        const count = props.images[key]
        if (count > 0) {
            images.push({image: key, count:props.images[key]})
            total += props.images[key]
        }
    };

    return (
        <div className="col-sm-4">
            <div className="table">
                <tbody>
                    {images.map(image =>
                        <OrderDetail image={image.image} count={image.count} />
                    )}
                    <tr>
                        <td>
                            Total
                        </td>
                        <td>
                            {total}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Cost
                        </td>
                        <td>
                            £{total * 2.5}
                        </td>
                    </tr>
                </tbody>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">@</span>
                </div>
                <input type="text" className="form-control" placeholder="Email" />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Comment</span>
                </div>
                <textarea type="text" className="form-control"/>
            </div>
            <button type="button" className="btn btn-primary">Send</button>
        </div>
    )
}


const Gallery = (props) => {
    let images = []
    for (var key in props.images) {
        images.push({image: key, count:props.images[key]})
    };

    return (
        <div className="row">
            {images.map(image =>
                <div key={image.image} className="col-sm-4">
                    <GalleryCard image={image.image} count={image.count} updateImageCount={props.updateImageCount}/>
                </div>
            )}
        </div>
    )
}

class App extends React.Component {
    state = {
        images: {'images/a.png': 1,'images/b.png': 0, 'images/p.png':2},
        page: 'order'
    }

    updateImageCount = (image, count) => {
        let previousImages = this.state.images;
        previousImages[image] = count
        this.setState({images: previousImages});
    }

    setPage = (page) => {
        this.setState({page: page});
    }

    render() {
        return (
            <div>
                <NavBar page={this.state.page} setPage={this.setPage}/>
                {this.state.page === 'info' && <Info />}
                {this.state.page === 'gallery' && <Gallery images={this.state.images} updateImageCount={this.updateImageCount}/>}
                {this.state.page === 'order' && <Order images={this.state.images} />}

            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('gallery')
);

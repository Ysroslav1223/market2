import './admin.css'

export const Admin =()=>{
        return(
            <div>
                <div>
                    <h2 className='add-title'>Добавление товара</h2>
                </div>
                <div className="setting-control">
                    <div className="name">
                        <label>Название товара:</label>
                        <input className='name-input'/>
                    </div>
                    <div className="price-goods">
                        <label>Цена товара:</label>
                        <input className='price-input'/>
                    </div >
                    <div className="category">
                       <label>Категория товара:</label> 
                        <input className='category-input'/>
                    </div>
                    <div className="image">
                        <label>Картинка товара URL</label>
                        <input className='image-input'/>
                    </div>
                    <div className="generation">
                        <label>Поколение товара:</label>
                        <input className='generation-input'/>
                    </div>
                </div>
                <div>
                    <h2 className='title-add-example'>Пример добавления товара</h2>
                    <div className='setting-expamle'>
                        <div className="name">
                        <label>Название товара:</label>
                        <input className='name-input' placeholder='Apple Iphone' disabled={true}/>
                    </div>
                    <div className="price-goods">
                        <label>Цена товара:</label>
                        <input className='price-input' placeholder='52 490' disabled={true}/>
                    </div >
                    <div className="category">
                       <label>Категория товара:</label> 
                        <input className='category-input' placeholder='smartphone' disabled={true}/>
                    </div>
                    <div className="image">
                        <label>Картинка товара URL</label>
                        <input className='image-input' placeholder='https://i.ibb.co/wh8YSFMV/Group-1-Photoroom.png' disabled={true}/>
                    </div>
                    <div className="generation">
                        <label>Поколение товара:</label>
                        <input className='generation-input' placeholder='16' disabled={true}/>
                    </div>
                    </div>
                </div>
                <div>
                    <h2 className='title-review'>Обзор</h2>
                    <div className='review'>
                        <label className='category-review'>Категория товаров:</label>
                        <span>smartphone/</span>
                        <span>tablet/</span>
                        <span>laptop/</span>
                        <span>headphones/</span>
                    </div>
                    <div className='review-generation'>
                         <label className='generaton-review'>Поколение товаров:</label>
                         <span>с 13 по 16 Iphone в зависимости от поколений</span>
                         <span>с 23 по 25 Ipad в зависимости от года</span>
                         <span>с 30 по 33 AirPods- 33 поколение  самое старое</span>
                         <span>с 40 по 42 MacBook- 42 поколение самое старое</span>
                    </div>
                </div>
            </div>
        )
}
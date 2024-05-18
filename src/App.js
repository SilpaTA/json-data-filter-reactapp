import logo from './logo.svg';
import './App.css';
import PostFilterAjax from './PostFilterAjax.';
function App() {
  return (
    <>
    <header class="plugin-header">
      <div class="plugin-identity">
        <h1>Post Filter</h1>
      </div>  
    </header>
    <div className=' container-fluid'>
      <div className='wrapper-filter'>
          <PostFilterAjax />
      </div>
    </div>
    
    </>
    
    
  );
}

export default App;

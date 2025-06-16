import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('token');
if (token) {
  const decoded = jwtDecode(token);
  if (decoded.isAdmin) {
    navigate('/admin'); 
  }
}

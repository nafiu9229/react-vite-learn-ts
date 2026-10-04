interface AlertProps {
  //children: string; // Define the type of children as string
  children: React.ReactNode; // Define the type of children as React.ReactNode
  onClose: () => void;
}

const Alert = ({ children, onClose }: AlertProps) => {
  return (
    <div className="alert alert-success alert-dismissable fade show" role="alert">
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="close" onClick={ onClose }></button>
      {children}
    </div>
  );
}

export default Alert;
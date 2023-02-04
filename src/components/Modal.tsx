export const Modal = (props: { children: any; onClose: () => void }) => (
  <div
    onClick={props.onClose}
    className="bg-[rgba(0,0,0,0.8)] fixed inset-0 flex justify-center items-center z-80"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-gray-600 text-white w-full max-w-md p-4"
    >
      {props.children}
    </div>
  </div>
)

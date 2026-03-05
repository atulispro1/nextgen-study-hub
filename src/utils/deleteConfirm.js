import Swal from "sweetalert2";

export async function confirmDelete(action) {

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    await action();

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "The item has been deleted.",
      timer: 1500,
      showConfirmButton: false,
    });
  }
}
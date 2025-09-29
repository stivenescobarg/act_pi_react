"use client";

import { useState, useEffect } from "react";

interface UserProfileProps {
  onUserUpdate: (name: string, avatar: string) => void;
}

export default function UserProfile({ onUserUpdate }: UserProfileProps) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isEditing, setIsEditing] = useState(true); // controla controla si se muestra el formulario de edición o solo el botón. 🔹 empieza en edición

  // 🔹 Recuperar datos guardados
  // useEffect se ejecuta al montar el componente []
  // Busca en localStorage un nombre y avatar guardados previamente
  // Si los encuentra, los carga en el estado y oculta el formulario
  // Esto permite que el usuario vea su perfil guardado al recargar la página
  // Si no hay datos guardados, permanece en modo edición para /que el usuario pueda crear su perfil

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedName) {
      setName(savedName);
      setIsEditing(false); // si ya tiene perfil, no mostrar formulario
    }
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  // 🔹 Guardar cambios
  const handleSave = () => {
    localStorage.setItem("userName", name);
    localStorage.setItem("userAvatar", avatar);
    onUserUpdate(name, avatar); //CP
    setIsEditing(false); // ocultar formulario después de guardar
  };

  if (!isEditing) {
    return (
      <div className="user-profile">
        <button onClick={() => setIsEditing(true)}>✏️ Editar perfil</button>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h2>👤 Personaliza tu perfil</h2>
      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL de tu avatar"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
      <button onClick={handleSave}>Guardar</button>
    </div>
  );
}
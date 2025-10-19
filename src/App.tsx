import "./App.css";
import { useCodingGoodsTitle } from "./hooks/useCodingGoods";
import { useUpdateCodingGoods } from "./hooks/useUpdateCodingGoods";
import { SearchableSelect } from "./components/SearchableSelect";
import { useState } from "react";
import type { ICodingGoodsListItem } from "./types/apiTypes";

function App() {
  const {
    data: codingGoodsTitle,
    isLoading,
    isError,
    error,
  } = useCodingGoodsTitle();

  const [selectedItem, setSelectedItem] = useState<ICodingGoodsListItem | null>(
    null
  );
  const [editingCodesaze, setEditingCodesaze] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const updateMutation = useUpdateCodingGoods();

  const handleEditClick = () => {
    if (selectedItem) {
      setEditingCodesaze(selectedItem.codesaze || "");
      setIsEditing(true);
    }
  };

  const handleSaveClick = async () => {
    if (selectedItem && editingCodesaze !== selectedItem.codesaze) {
      try {
        await updateMutation.mutateAsync({
          itemId: selectedItem.ID,
          updates: { codesaze: editingCodesaze },
        });

        // Update the selected item with new value
        setSelectedItem({
          ...selectedItem,
          codesaze: editingCodesaze,
        });

        setIsEditing(false);
        alert("کد ساز سیم با موفقیت بروزرسانی شد!");
      } catch (error) {
        console.error("خطا در بروزرسانی:", error);
        alert("خطا در بروزرسانی کد ساز سیم!");
      }
    }
  };

  const handleCancelClick = () => {
    setEditingCodesaze("");
    setIsEditing(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  console.log(codingGoodsTitle);
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>انتخاب محصول</h1>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
        >
          انتخاب عنوان محصول:
        </label>
        <SearchableSelect
          options={codingGoodsTitle || []}
          value={selectedItem}
          onChange={setSelectedItem}
          placeholder="جستجو و انتخاب کنید..."
        />
      </div>

      {selectedItem && (
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          <p>اطلاعات انتخاب شده:</p>
          <p>
            <strong>شرح محصول:</strong> {selectedItem.sharhmahsolbarayefactor}
          </p>
          <div style={{ marginBottom: "12px" }}>
            <strong>کد ساز سیم:</strong>
            {isEditing ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "4px",
                }}
              >
                <input
                  type="text"
                  value={editingCodesaze}
                  onChange={(e) => setEditingCodesaze(e.target.value)}
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                    minWidth: "200px",
                  }}
                  placeholder="کد ساز سیم را وارد کنید..."
                />
                <button
                  type="button"
                  onClick={handleSaveClick}
                  disabled={updateMutation.isPending}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#0078d4",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: updateMutation.isPending
                      ? "not-allowed"
                      : "pointer",
                    fontSize: "14px",
                    opacity: updateMutation.isPending ? 0.6 : 1,
                  }}
                >
                  {updateMutation.isPending ? "در حال ذخیره..." : "ثبت"}
                </button>
                <button
                  type="button"
                  onClick={handleCancelClick}
                  disabled={updateMutation.isPending}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: updateMutation.isPending
                      ? "not-allowed"
                      : "pointer",
                    fontSize: "14px",
                    opacity: updateMutation.isPending ? 0.6 : 1,
                  }}
                >
                  لغو
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "4px",
                }}
              >
                <span style={{ fontSize: "14px" }}>
                  {selectedItem.codesaze || "تعریف نشده"}
                </span>
                <button
                  type="button"
                  onClick={handleEditClick}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  ویرایش
                </button>
              </div>
            )}
          </div>
          <p>
            <strong>کد نهایی محصول:</strong> {selectedItem.Title}
          </p>
          <p>
            <strong>شناسه:</strong> {selectedItem.ID}
          </p>
          <p>
            <strong>کد:</strong> {selectedItem.coding}
          </p>
          <p>
            <strong>گروه:</strong> {selectedItem.group}
          </p>
          <p>
            <strong>رنگ:</strong> {selectedItem.rang}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

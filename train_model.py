import matplotlib.pyplot as plt
from sklearn.metrics import roc_curve
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import joblib
df = pd.read_csv("diabetes.csv")
X = df.drop("Outcome", axis=1)
y = df["Outcome"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)
joblib.dump(model, "model.pkl")
print("Model trained successfully!")
from sklearn.metrics import accuracy_score
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
from sklearn.metrics import roc_curve
import matplotlib.pyplot as plt
# Predict probabilities
y_prob = model.predict_proba(X_test)[:,1]
# ROC values
fpr, tpr, _ = roc_curve(y_test, y_prob)
# Plot
plt.plot(fpr, tpr)
plt.xlabel("False Positive Rate")
plt.ylabel("True Positive Rate")
plt.title("ROC Curve")
plt.savefig("roc_curve.png")
plt.show()
plt.savefig("images/roc_curve.png")
import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
# Predict values
y_pred = model.predict(X_test)
# Create confusion matrix
cm = confusion_matrix(y_test, y_pred)
# Plot confusion matrix
disp = ConfusionMatrixDisplay(confusion_matrix=cm)
disp.plot(cmap="Blues")
plt.title("Confusion Matrix")
# Save image
plt.savefig("images/confusion_matrix.png")
# Show image
plt.show()
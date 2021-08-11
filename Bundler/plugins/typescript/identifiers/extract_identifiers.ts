import { ts } from "../../../deps.ts";

export function typescriptExtractIdentifiersTransformer(
  identifiers: Set<string>,
) {
  return (context: ts.TransformationContext) => {
    const visitor = (sourceFile: ts.SourceFile): ts.Visitor =>
      (node: ts.Node) => {
        if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
          // const x = "x"
          const text = node.name.text;
          identifiers.add(text);
        } else if (ts.isCallExpression(node)) {
          // console.log(x)
          const expression = node.expression;
          if (ts.isIdentifier(expression)) {
            const text = expression.text;
            identifiers.add(text);
          }
          node.arguments.map((arg) => {
            if (
              ts.isIdentifier(arg)
            ) {
              const text = arg.text;
              identifiers.add(text);
            }
            return arg;
          });
        } else if (ts.isFunctionDeclaration(node)) {
          // function x() { }
          const name = node.name;
          if (name) {
            const text = name.text;
            identifiers.add(text);
          }

          node = ts.factory.updateFunctionDeclaration(
            node,
            node.decorators,
            node.modifiers,
            node.asteriskToken,
            name,
            node.typeParameters,
            node.parameters,
            node.type,
            node.body,
          );
          return ts.visitEachChild(
            node,
            visitor(sourceFile),
            context,
          );
        } else if (ts.isClassDeclaration(node) && node.name) {
          const text = node.name.text;
          identifiers.add(text);
        } else if (ts.isArrayLiteralExpression(node)) {
          // const a = [x, y, z]
          node = ts.factory.updateArrayLiteralExpression(
            node,
            node.elements.map((element) => {
              if (ts.isIdentifier(element)) {
                const text = element.text;
                identifiers.add(text);
              }
              return element;
            }),
          );
        } else if (ts.isObjectLiteralExpression(node)) {
          // const a = { x, y, z: x }
          node = ts.factory.updateObjectLiteralExpression(
            node,
            node.properties.map((property) => {
              if (
                ts.isPropertyAssignment(property) &&
                ts.isIdentifier(property.initializer)
              ) {
                const text = property.initializer.text;
                identifiers.add(text);
              } else if (ts.isShorthandPropertyAssignment(property)) {
                const text = property.name.text;
                identifiers.add(text);
              }
              return property;
            }),
          );
        } else if (
          // x.a
          ts.isPropertyAccessExpression(node) &&
          ts.isIdentifier(node.expression)
        ) {
          const text = node.expression.text;
          identifiers.add(text);
        } else if (
          // x["a"]
          ts.isElementAccessExpression(node) &&
          ts.isIdentifier(node.expression)
        ) {
          const text = node.expression.text;
          identifiers.add(text);
        } else if (
          ts.isTypeOfExpression(node) && ts.isIdentifier(node.expression)
        ) {
          // typeof x
          const text = node.expression.text;
          identifiers.add(text);
        } else if (ts.isBinaryExpression(node)) {
          // x instanceof x
          //x += 1
          const left = node.left;
          const right = node.right;
          if (ts.isIdentifier(left)) {
            const text = left.text;
            identifiers.add(text);
          }
          if (ts.isIdentifier(right)) {
            const text = right.text;
            identifiers.add(text);
          }
        } else if (
          ts.isPrefixUnaryExpression(node) && ts.isIdentifier(node.operand)
        ) {
          // ++x
          const text = node.operand.text;
          identifiers.add(text);
        } else if (
          ts.isPostfixUnaryExpression(node) && ts.isIdentifier(node.operand)
        ) {
          // x++
          const text = node.operand.text;
          identifiers.add(text);
        } else if (ts.isConditionalExpression(node)) {
          // x ? x : x
          const condition = node.condition;
          const whenTrue = node.whenTrue;
          const whenFalse = node.whenFalse;
          if (ts.isIdentifier(condition)) {
            const text = condition.text;
            identifiers.add(text);
          }
          if (ts.isIdentifier(whenTrue)) {
            const text = whenTrue.text;
            identifiers.add(text);
          }
          if (ts.isIdentifier(whenFalse)) {
            const text = whenFalse.text;
            identifiers.add(text);
          }
        } else if (ts.isIfStatement(node)) {
          // if (x) { }
          const expression = node.expression;
          if (ts.isIdentifier(expression)) {
            const text = expression.text;
            identifiers.add(text);
          }
        } else if (ts.isSwitchStatement(node)) {
          // switch (x) { }
          const expression = node.expression;
          if (ts.isIdentifier(expression)) {
            const text = expression.text;
            identifiers.add(text);
          }
        } else if (ts.isCaseClause(node)) {
          const expression = node.expression;
          if (ts.isIdentifier(expression)) {
            const text = expression.text;
            identifiers.add(text);
          }
        } else if (ts.isWhileStatement(node)) {
          // while (x) { }
          const expression = node.expression;
          if (ts.isIdentifier(expression)) {
            const text = expression.text;
            identifiers.add(text);
          }
        } else if (ts.isDoStatement(node)) {
          // do {} while (x) { }
          const expression = node.expression;
          if (ts.isIdentifier(expression)) {
            const text = expression.text;
            identifiers.add(text);
          }
        } else if (ts.isForStatement(node)) {
          // for (let x = 0; x > 0; i++) { }
          const initializer = node.initializer;
          const condition = node.condition;
          const incrementor = node.incrementor;
          if (initializer && ts.isIdentifier(initializer)) {
            const text = initializer.text;
            identifiers.add(text);
          }
          if (condition && ts.isIdentifier(condition)) {
            const text = condition.text;
            identifiers.add(text);
          }
          if (incrementor && ts.isIdentifier(incrementor)) {
            const text = incrementor.text;
            identifiers.add(text);
          }
        } else if (ts.isForOfStatement(node)) {
          // for (x of x) { }
          const initializer = node.initializer;
          const expression = node.expression;
          if (ts.isIdentifier(initializer)) {
            const text = initializer.text;
            identifiers.add(text);
          }
          if (ts.isIdentifier(expression)) {
            const text = expression.text;
            identifiers.add(text);
          }
        } else if (ts.isForInStatement(node)) {
          // for (x in x) { }
          const initializer = node.initializer;
          const expression = node.expression;
          if (ts.isIdentifier(initializer)) {
            const text = initializer.text;
            identifiers.add(text);
          }
          if (ts.isIdentifier(expression)) {
            const text = expression.text;
            identifiers.add(text);
          }
        } else if (ts.isNewExpression(node)) {
          // new x()
          const expression = node.expression;
          if (ts.isIdentifier(expression)) {
            const text = expression.text;
            identifiers.add(text);
          }
        } else if (ts.isEnumDeclaration(node)) {
          const name = node.name;
          if (ts.isIdentifier(name)) {
            const text = name.text;
            identifiers.add(text);
          }
        }
        return ts.visitEachChild(node, visitor(sourceFile), context);
      };
    return (node: ts.SourceFile) =>
      ts.visitNode(node, (child: ts.Node) => visitor(node)(child));
  };
}

export function extractIdentifiersFromSourceFile(sourceFile: ts.SourceFile) {
  const identifiers: Set<string> = new Set();
  ts.transform(sourceFile, [
    typescriptExtractIdentifiersTransformer(identifiers),
  ]);
  return identifiers;
}

export function extractIdentifiers(fileName: string, sourceText: string) {
  const sourceFile = ts.createSourceFile(
    fileName,
    sourceText,
    ts.ScriptTarget.Latest,
  );
  return extractIdentifiersFromSourceFile(sourceFile);
}
